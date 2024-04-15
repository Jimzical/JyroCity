import socket
import threading

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 65432        # Port to listen on (non-privileged ports are > 1023)
HEADER = 64
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = "end"

def handle_client(conn, addr):
    print(f"New connection {addr} connected.")
    connected = True
    while connected:
        msg_length = conn.recv(HEADER).decode(FORMAT)
        if msg_length:
            msg_length = int(msg_length)
            msg = conn.recv(msg_length).decode(FORMAT)
            if msg == DISCONNECT_MESSAGE:
                connected = False

            print(f"[{addr}] {msg}")
            conn.send("Msg received".encode(FORMAT))

    conn.close()

def start_server():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        # Bind to all network interfaces
        s.bind(('0.0.0.0', PORT))
        # Alternatively, you can use '0.0.0.0' to explicitly listen on all interfaces
        # s.bind(('0.0.0.0', PORT))
        s.listen()
        print(f'Server listening on 0.0.0.0:{PORT}')

        while True:
            conn, addr = s.accept()
            thread = threading.Thread(target=handle_client, args=(conn, addr))
            thread.start()
            # Check for disconnect message in the thread
            if DISCONNECT_MESSAGE in thread._args:
                break

def start_client():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        print(f'Connected to {HOST}:{PORT}')

        while True:
            data = input('Enter data to send (or "q" to quit): ')
            if data == 'q':
                break
            if data == '1':
                for i in range(1, 11):
                    s.sendall(str(i).encode())
            s.sendall(data.encode())

    print('Client closed')

def main():
    choice = input('Choose an option (1: Server, 2: Client): ')

    if choice == '1':
        start_server()
    elif choice == '2':
        start_client()
    else:
        print('Invalid choice')

if __name__ == '__main__':
    main()
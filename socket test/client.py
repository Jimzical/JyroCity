import socket

# Create a TCP/IP socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect the socket to the server's IP address and port
server_address = ('127.0.0.1', 12345)
print('Connecting to {} port {}'.format(*server_address))
client_socket.connect(server_address)

try:
    # Send data
    message = 'Hello, server. This is the client.'
    print('Sending:', message)
    client_socket.sendall(message.encode())

    # Receive response
    data = client_socket.recv(16)
    print('Received:', data.decode())

finally:
    # Clean up the connection
    client_socket.close()

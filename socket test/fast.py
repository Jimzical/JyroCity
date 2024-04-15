from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

app = FastAPI()

templates = Jinja2Templates(directory="templates")

class Item(BaseModel):
    value: int = 0

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.post("/data", response_class=HTMLResponse)
async def create_item(request: Request, item: Item):
    print(item.value)

@app.get("/add/{string}", response_class=HTMLResponse)
async def add_string(request: Request, string: str):
    return templates.TemplateResponse("item.html", {"request": request, "string": string})

import uvicorn
import time
from contextlib import asynccontextmanager
from common.logger import log_exception
from common.redis import redis_pool
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from router.node import node_api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = await redis_pool()
    yield
    await app.state.redis.close()
    
    
app = FastAPI()

app = FastAPI(
    docs_url=None, 
    redoc_url=None,
    title="Unit-AI后端",
    description="Unit-AI后端",
    version="0.0.1",
    contact={
        "name": "Kinda Hall",
        "url": "https://alndaly.github.io",
        "email": "1142704468@qq.com",
    },
)

origins = [
    "https://unit-ai.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(node_api_router, prefix="/node", tags=["node"])


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["Process-Time"] = str(process_time)
    return response


@app.exception_handler(Exception)
async def unicorn_exception_handler(request: Request, exc: Exception):
    log_exception()
    return JSONResponse(
        status_code=418,
        content={
            "message": f"Oops! {exc}"},
    )

app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
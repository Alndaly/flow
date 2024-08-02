import importlib
from pathlib import Path
from fastapi import APIRouter
from common.base import BASE_DIR
from common.utils import dynamic_import

core_nodes = Path(BASE_DIR) / 'plugins' / 'core'
core = dynamic_import(core_nodes)

node_api_router = APIRouter()

@node_api_router.get('/')
async def get_all_nodes():
    """
    Get all nodes
    """
    return "Get all nodes"
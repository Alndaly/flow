from fastapi import APIRouter

node_api_router = APIRouter()

@node_api_router.get('/')
async def get_all_nodes():
    """
    Get all nodes
    """
    return "Get all nodes"
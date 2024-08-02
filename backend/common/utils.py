import importlib
from pathlib import Path

def dynamic_import(path: Path):
    """
    Dynamically import a module from a given path.

    Args:
        path (str): The path to the module to import.

    Returns:
        module: The imported module.
    """
    try:
        module = importlib.import_module(f"plugins.{path.name}")
        print(f"成功加载模块：{module}")
    except Exception as e:
        print(f"无法加载模块 {path.name}: {e}")
    return module
    
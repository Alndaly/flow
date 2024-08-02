# 这里放置社区插件逻辑

import pathlib
from common.utils import dynamic_import

# 获取当前文件夹下所有的Python文件
current_directory = pathlib.Path(__file__).parent
python_files = [f for f in current_directory.glob('*.py') if f.name != pathlib.Path(__file__).name]

# 动态加载所有 Python 文件模块
modules = {}
for py_file in python_files:
    module_name = py_file.stem  # 去掉“.py”扩展名
    try:
        module = dynamic_import(module_name)
        modules[module_name] = module
        print(f"成功加载模块：{module_name}")
    except Exception as e:
        print(f"无法加载模块 {module_name}: {e}")

# 现在所有模块都在 modules 字典中
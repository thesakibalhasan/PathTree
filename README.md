# 🌳 PathTree - VS Code Extension

## 📌 Overview

**PathTree** is a powerful VS Code extension that allows developers to generate a structured file path tree of their workspace. It enables users to visualize and document their project structure efficiently.

## 🚀 Features

✅ Generate a full **file path tree** for the entire workspace.<br>
✅ Create a **file path tree** for a specific folder by right-clicking.<br>
✅ Output file structure in a well-formatted `.path.txt` file.<br>



## 🛠️ How to Use

### **Method 1: Generate Full File Path Tree**

1. Open the command palette (`Ctrl+Shift+P`).
2. Type **"Generate File Path Tree"** and press `Enter`.
3. A new file `file.path.txt` will be created in your workspace containing the structured file paths.
4. You will see a progress notification while the file tree is being generated.

🔹 **Example Output:**

```
my_project/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   ├── utils/
│   │   ├── helper.js
│   ├── index.js
├── public/
│   ├── index.html
├── package.json
└── README.md
```

![Method 1 Example](https://i.postimg.cc/8PJmbyY4/1.gif)

### **Method 2: Generate Path for a Specific Folder**

1. Right-click on any folder in the **Explorer Sidebar**.
2. Click **"Create this folder's file path 🌳"**.
3. A new file `{folder-name}.path.txt` will be created inside the selected folder.

🔹 **Example Output for **`src`** Folder:**

```
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
├── utils/
│   ├── helper.js
├── index.js
```

![Method 2 Example](https://i.postimg.cc/50pWn96h/2.gif)


## 📜 Commands

| Command ID                        | Description                                      |
| --------------------------------- | ------------------------------------------------ |
| `pathtree.generateFilePath`       | Generate file path tree for the entire workspace |



## 🛠️ Contributing

We welcome contributions! Feel free to open an issue or submit a pull request.

## 🏆 Credits

Developed by **Sakib Al Hasan**.

## 📄 License

This extension is licensed under the **MIT License**.

---

🚀 **Enjoy coding with an organized workspace!** 🌳
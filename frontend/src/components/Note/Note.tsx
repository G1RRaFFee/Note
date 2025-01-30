import React, { FC, useEffect, useRef, useState } from "react";
import EditorJS, {
  type OutputData,
  type ToolConstructable,
  type ToolSettings,
} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import AttachesTool from "@editorjs/attaches";

import { AxiosError } from "axios";

import AxiosInstance from "@/api/axios.config";

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await AxiosInstance.post("files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { url, name, size } = response.data.file;
    return {
      url: url,
      name: name,
      size: size,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

interface Tools {
  [toolName: string]: ToolConstructable | ToolSettings;
}

const EDITOR_HOLDER_ID = "editorjs";

const EDITOR_TOOLS: Tools = {
  header: Header,
  list: List,
  quote: Quote,
  attaches: {
    class: AttachesTool,
    config: {
      uploader: {
        uploadByFile: async (file: File) => {
          const uploadedFile = await uploadFile(file);
          console.log(uploadedFile);
          return {
            success: 1,
            file: {
              url: uploadedFile.url,
              title: uploadedFile.name,
              size: uploadedFile.size,
            },
          };
        },
        uploadByUrl: async (url: string) => {
          return {
            success: 1,
            file: {
              url,
              name: "unknown",
              size: 0,
            },
          };
        },
      },
    },
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: async (file: File) => {
          const url = await uploadFile(file);
          return {
            success: 1,
            file: {
              url,
            },
          };
        },
        uploadByUrl: async (url: string) => {
          return {
            success: 1,
            file: {
              url,
            },
          };
        },
      },
    },
  },
};

interface EditorComponentProps {
  initialData?: OutputData;
  onSave?: (data: OutputData) => void;
}

const Notes: FC<EditorComponentProps> = ({ initialData, onSave }) => {
  const editorInstance = useRef<EditorJS | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!editorInstance.current) {
      initEditor();
    }

    return () => {
      destroyEditor();
    };
  }, []);

  const initEditor = () => {
    try {
      editorInstance.current = new EditorJS({
        holder: EDITOR_HOLDER_ID,
        placeholder: "Start writting here...",
        tools: EDITOR_TOOLS,
        data: initialData,
        onReady: () => console.log("Note is init."),
        onChange: async (api, event) => {
          console.log("api: ", api);
          console.log("event: ", event);
        },
      });
    } catch (error) {
      console.error("Editor initialization error:", error);
    }
  };

  const destroyEditor = async () => {
    if (editorInstance.current && editorInstance.current.destroy) {
      try {
        await editorInstance.current.isReady;
        editorInstance.current.destroy();
        editorInstance.current = null;
      } catch (error) {
        console.error("Error destroying editor:", error);
      }
    }
  };

  const handleSave = async () => {
    if (!editorInstance.current) return;

    try {
      const savedData = await editorInstance.current.save();
      console.log(savedData);
      //   await axios.post("/api/content", savedData);

      if (onSave) onSave(savedData);
      setSaveError(null);
    } catch (error) {
      const err = error as AxiosError;
      setSaveError(err.message || "Failed to save content");
      console.error("Save error:", error);
    }
  };

  return (
    <>
      <div id={EDITOR_HOLDER_ID} />

      <div className="editor-controls">
        <button onClick={handleSave} className="save-button">
          Save Content
        </button>

        {saveError && <div className="error-message">Error: {saveError}</div>}
      </div>
    </>
  );
};

export default Notes;

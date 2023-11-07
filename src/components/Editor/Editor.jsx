import React from "react";
import styles from "./Editor.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BASE_URL, IMG_URL } from "../../api/API";

export default function Editor({ setData }) {
  const UPLOAD_ENDPOINT = "minio/image";

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("image", file);
            let headers = new Headers();
            headers.append("Origin", "http://localhost:3000");
            fetch(`${BASE_URL}/${UPLOAD_ENDPOINT}`, {
              headers: headers,
              method: "post",
              body: body
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: `${IMG_URL}/${res.url}` });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <div className="editor-container">
      <CKEditor
        config={{
          extraPlugins: [uploadPlugin]
        }}
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
        }}
      />
    </div>
  );
}

import React, { useEffect } from "react";
import styles from "./Editor.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BASE_URL, IMG_URL } from "../../api/index";

import { uploadImage } from "../../api/UploadFile";

export default function Editor({ setData, data }) {
  const UPLOAD_ENDPOINT = "minio/image";

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            // body.append("image", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            // fetch(`${BASE_URL}/${UPLOAD_ENDPOINT}`, {
            //   headers: headers,
            //   method: "post",
            //   body: body
            // })
            uploadImage(file)
              .then((res) => {
                if (res.code === 200)
                  resolve({ default: `${IMG_URL}/${res.data.url}` });
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
        data={data}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
        }}
      />
    </div>
  );
}

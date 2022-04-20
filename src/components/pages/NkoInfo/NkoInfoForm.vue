<script setup lang="ts">
// Components

import DropZone from "@/components/ui/file_loader/DropZone.vue";
import FilePreview from "@/components/ui/file_loader/FilePreview.vue";

// File Management
import useFileList from "@/components/ui/file_loader/compositions/fileList";
const { files, addFiles, removeFile } = useFileList();
function onInputChange(e) {
  addFiles(e.target.files);
  e.target.value = null; // reset so that selecting the same file again will still cause it to fire this change
}
// Uploader
import createUploader from "@/components/ui/file_loader/compositions/fileUploader";
const { uploadFiles } = createUploader("YOUR URL HERE");
// const schema = yup.object({
//   shortDescriptionActivity: yup.string().max(150).required(),
//   fullDescriptionActivity: yup.string().max(2000).required(),
//   site: yup.string().required(),
//   phone,
//   email,
//   vk,
//   classmates,
//   facebook,
//   insta,
//   logo,
//   media,
// });
</script>
<template>
  <div class="profile_form_container">
    <div class="profile_form_wrapper">
      <DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
        <label for="file-input">
          <span v-if="dropZoneActive">
            <span>Перетащите или загрузите файлы</span>
            <span class="smaller">Добавьте</span>
          </span>
          <p class="action" v-else>
            <span>Перетащите </span>
            <span class="smaller">
              <strong>или <em>загрузите файлы</em></strong>
            </span>
          </p>
          <input type="file" id="file-input" multiple @change="onInputChange" />
        </label>
        <ul class="image-list" v-show="files.length">
          <FilePreview
            v-for="file of files"
            :key="file.id"
            :file="file"
            tag="li"
            @remove="removeFile"
          />
        </ul>
      </DropZone>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action {
  display: flex;
  white-space: break-spaces;
  * {
    font-weight: 600 !important;
  }
  em {
    border-bottom: 1px solid #0f75bd;
    //   text-decoration: underline;
  }
}
.drop-area {
  color: #0f75bd;
  width: 100%;
  //   max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  background: #ffffff55;
  //   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: 0.2s ease;
  min-height: 76px;
  padding: 22px 78px;
  max-width: 420px;
  border: 2px solid #b0ceec;
  border-radius: 10px;
  &[data-active="true"] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: #ffffffcc;
  }
}
label {
  font-size: 36px;
  cursor: pointer;
  display: block;
  span {
    display: block;
  }
  input[type="file"]:not(:focus-visible) {
    // Visually Hidden Styles taken from Bootstrap 5
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
}
.image-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
}
.upload-button {
  display: block;
  appearance: none;
  border: 0;
  border-radius: 50px;
  padding: 0.75rem 3rem;
  margin: 1rem auto;
  font-size: 1.25rem;
  font-weight: bold;
  background: #369;
  color: #fff;
  text-transform: uppercase;
}
button {
  cursor: pointer;
}
</style>
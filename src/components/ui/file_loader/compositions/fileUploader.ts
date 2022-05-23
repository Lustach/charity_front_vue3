import API from '@/plugins/axios';
import { useProfileStore } from "@/stores/modules/profile/profile";
let profileStore = new useProfileStore();
export async function uploadFile(file, url) {
    console.log('uploadFIlea');
    // set up the request data
    let formData = new FormData()
    formData.append('fund', profileStore.fund.id)
    formData.append('upload_image', file.file)

    // track status and upload file
    file.status = 'loading'
    console.log(formData.get('upload_image'), 'formData');
    let response
    try {
        response = await API.fill_profile.createMedia(formData)
        // change status to indicate the success of the upload request
        file.status = 'success'
    } catch (e) {
        console.error(e);
        file.status = 'error'
    }
    return response
}

export function uploadFiles(files, url) {
    console.log(files, url, 'uploadFiles');
    return Promise.all(files.map((file) => uploadFile(file, url)))
}

export default function createUploader(url) {
    return {
        uploadFile: function (file) {
            console.log(file, 'uploadFile');

            return uploadFile(file, url)
        },
        uploadFiles: function (files) {
            console.log(files, 'uploadFiles');

            return uploadFiles(files, url)
        },
    }
}
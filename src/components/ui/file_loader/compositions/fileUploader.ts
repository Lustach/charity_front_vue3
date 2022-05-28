import API from '@/plugins/axios';
import { useProfileStore } from "@/stores/modules/profile/profile";
const profileStore = useProfileStore();
export async function uploadFile(file, apiRequest, payload?:any) {
    console.log(file, 'uploadFile1');
    // set up the request data
    let formData = new FormData()
    formData.set('fund', profileStore.fund.id)
    formData.set('upload_image', file.file)
    // track status and upload file
    file.status = 'loading'
    console.log(formData.get('upload_image'), 'formData');
    let response
    try {
        // response = await fetch(apiRequest, { method: 'POST', body: formData })
        // response = await API.fill_profile.createMedia(formData)
        console.log(apiRequest, 'here');

        response = await apiRequest(formData);

        // change status to indicate the success of the upload request
        file.status = 'success'
    } catch (e) {
        console.error(e);
        file.status = 'error'
    }
    return response
}

export function uploadFiles(files, apiRequest) {
    console.log(files, apiRequest, 'uploadFiles');
    return Promise.all(files.map((file) => uploadFile(file, apiRequest)))
}

//payload - все остальные параметры для функции
//data - дополнительные данные в теле запроса записывается в formData uploadFile 
export default function createUploader(apiRequest, payload?:any) {
    return {
        uploadFile: function (file) {
            console.log(file, 'uploadFile');

            return uploadFile(file, apiRequest, payload)
        },
        uploadFiles: function (files) {
            console.log(files, 'uploadFiles1');

            return uploadFiles(files, apiRequest)
        },
    }
}
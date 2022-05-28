import { ref, inject } from 'vue'
interface removedFile {
    file: File
    id: string
    status: null
    url: string
}

export default function () {
    const files = ref([])

    function addFiles(newFiles: FileList) {
        let newUploadableFiles = [...newFiles].map((file) => new UploadableFile(file)).filter((file) => !fileExists(file.id))
        files.value = files.value.concat(newUploadableFiles)
    }

    function setFilePreview(newFiles: FileList) {
        let newUploadableFiles = [...newFiles].map((file) => new UploadableFile(file)).filter((file) => !fileExists(file.id))
        files.value = files.value.concat(newUploadableFiles)
        // files.value = files.value.concat(newFiles)
    }

    function fileExists(otherId) {
        return files.value.some(({ id }) => id === otherId)
    }

    function removeFile(file) {
        const index = files.value.indexOf(file)

        if (index > -1) files.value.splice(index, 1)
    }

    return { files, addFiles, setFilePreview, removeFile }
}

class UploadableFile implements removedFile {
    constructor(public file: File, public id: string, public status: null, public url: string) {
        this.file = file
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        // this.url = file.url
        this.url = URL.createObjectURL(file)
        this.status = null
    }
}
import { ElNotification } from "element-plus";

export const useNotification = () => {
    ElNotification({
        title: "Произошла ошибка",
        dangerouslyUseHTMLString: true,
        message:
            "<strong>Обратитесь в нашу тех. поддержку: <a href='mailto:info@voblago.io'>info@voblago.io</a> или попробуйте ещё раз</strong>",
        position: "bottom-right",
        type: 'error',
        showClose: false,
        duration: 3500,
    });
};
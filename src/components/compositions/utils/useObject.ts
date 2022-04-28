// import { ref, computed } from "vue";
export default function () {
//
    const filterObjectByKeys = function (object: {}, keepKeysList: String[]) {
        let result = Object.keys(object)
            .filter((key) => key.includes(keepKeysList.find((e) => e === key)))
            .reduce((cur: object, key) => {
                return Object.assign(cur, { [key]: object[key] }); // or key as keyof Form or key if used index in iterface or key as FormKeys
            }, {});
        return result;
    };

    return {
        filterObjectByKeys
    }
}
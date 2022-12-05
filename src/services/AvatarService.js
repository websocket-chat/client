import ApiClient from "../clients/ApiClient";

export default {
    uploadAvatar(file, accountID) {
        return ApiClient({
            method: "POST",
            url: `/v1/accounts/${accountID}/avatar`,
            data: {
                upload_file: file,
            }
        });
    },
    fetchAvatar(accountID) {
        return ApiClient({
            method: "GET",
            url: `/v1/accounts/${accountID}/avatar`,
        });
    },
    deleteAvatar(accountID) {
        return ApiClient({
            method: "DELETE",
            url: `/v1/accounts/${accountID}/avatar`
        });
    },
    fetchAvatarByBreakpoint(accountID, breakpoint) {
        return ApiClient({
            method: "GET",
            url: `/v1/accounts/${accountID}/avatar/${breakpoint}`
        });
    }
}
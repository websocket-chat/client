import ApiClient from "../clients/ApiClient";

export default {
    uploadAvatar(file, accountID, sessionID) {
        return ApiClient({
            method: "POST",
            url: `/v1/accounts/${accountID}/avatar`,
            headers: {
                "Authorization": `Bearer ${sessionID}`,
                "Content-Type": "multipart/form-data"
            },
            data: file
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
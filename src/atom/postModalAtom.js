import { atom } from "recoil";

export const PostmodalState = atom({
    key : 'PostModalState',
    default:false
});

export const postEditState = atom({
    key : "postEditState",
    default : ""
})

<script setup lang="ts">
const image = ref('https://www.dmarge.com/cdn-cgi/image/width=1200,quality=85,fit=scale-down,format=auto/https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg')

const filePreview = ref(null)
function changeImage(event) {
    console.log(event.target.files[0])
    const reader = new FileReader()
    reader.onload = function(e) {
        image.value = e.target.result
    }
    reader.readAsDataURL(event.target.files[0])
}
</script>

<template>
    <div class="avatar-upload">
        <div class="avatar-edit">
            <input type='file' id="imageUpload" @change="changeImage" accept=".png, .jpg, .jpeg" />
            <label for="imageUpload"></label>
        </div>
        <div class="avatar-preview">
            <div ref="filePreview" id="imagePreview" :style="{ backgroundImage: 'url(' + image + ')' }">
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.avatar-upload {
    position: relative;
    max-width: 205px;
    margin: 50px auto;
    .avatar-edit {
        position: absolute;
        right: 5px;
        z-index: 1;
        bottom: 5px;
        input {
            display: none;
            + label {
                display: inline-block;
                width: 50px;
                height: 50px;
                margin-bottom: 0;
                border-radius: 100%;
                background: #FFFFFF;
                border: 1px solid transparent;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
                cursor: pointer;
                font-weight: normal;
                transition: all .2s ease-in-out;
                &:hover {
                    background: #f1f1f1;
                    border-color: #d6d6d6;
                }
                &:after {
                    content: "✏️";
                    font-family: 'FontAwesome';
                    color: #757575;
                    position: absolute;
                    top: 15px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    margin: auto;
                }
            }
        }
    }
    .avatar-preview {
        width: 192px;
        height: 192px;
        position: relative;
        border-radius: 100%;
        border: 6px solid #F8F8F8;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        > div {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
}
</style>

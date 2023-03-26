import { defineComponent } from 'vue'
import { useDialogStore } from "../stores/index"

let dialogStore = useDialogStore()

export default defineComponent({
    props: {
        data: {
            type: Array<string>
        }
    },
    setup(props) {
        return () => {
            return (<div style="position:fixed;width:300px;left:calc(50vw - 150px);top:200px;background-color: #ffffff;    box-shadow: 0 0 1px 0 #607d8b;">
                <h2 style="background-color:#f44336;color:white;font-size:16px;padding:10px;">
                    {props.data && props.data[0]}
                </h2>
                <p style="line-height:100px;font-size:14px;text-align:center;padding:10px;">
                    {props.data && props.data[1]}
                </p>
                <div style="text-align:center;padding-bottom:10px;">
                    <button onClick={() => dialogStore.closeDialog.call(null, true)} style="margin-right:20px;cursor: pointer;background-color: #2196f3;color: white;">确定</button>
                    <button onClick={() => dialogStore.closeDialog.call(null, false)} style="cursor: pointer;">取消</button>
                </div>
            </div>)
        }

    }

})
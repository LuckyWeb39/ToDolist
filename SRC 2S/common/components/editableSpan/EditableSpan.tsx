import {useState} from "react";
import {TextField} from "@mui/material";

type Props = {
    title : string,
    onChangeTitle: (title: string) => void,
}

export const EditableSpan = ({title, onChangeTitle}:Props) => {

    const [isEdit,setIsEdit] = useState(false)
    const [newValue,setNewValue] = useState(title)

    const turnOnEditMode = () => {
        setIsEdit(true)
    }
    const turnOffEditMode = () => {
        setIsEdit(false)
        onChangeTitle(newValue)
    }

    return (
        isEdit ? (
            <TextField value={newValue}
                       autoFocus={true}
                       onChange={(e) => setNewValue(e.currentTarget.value)}
                       onBlur={turnOffEditMode}
                       size={"small"}
                       variant={'standard'}/>
        ): (
            <span onDoubleClick={turnOnEditMode}>{title}</span>
        )
    );
};


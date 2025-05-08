import {TextField} from "@mui/material";
import './App.css'
import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";


type Props = {
    createItem: (title: string) => void;
};

export const CreateItemForm = ({createItem}: Props) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }


    return (<>
            <div className={'item-form'}>
                {/*<input className={error ? 'error' : ''}*/}
                {/*       value={itemTitle}*/}
                {/*       onChange={changeItemTitleHandler}*/}
                {/*       onKeyDown={createItemOnEnterHandler}/>*/}

                <TextField
                    size='small'
                    error={!!error}
                    label="Add Task"
                    className={error ? 'error' : ''}
                    value={itemTitle}
                    onChange={changeItemTitleHandler}
                    onKeyDown={createItemOnEnterHandler}/>

                <IconButton
                    disabled={itemTitle.trim().length === 0}
                    onClick={createItemHandler}>
                    <AddBoxIcon/>
                </IconButton>
            </div>
            {error && <div className={'error-message'}>{error}</div>}

        </>
    );
};
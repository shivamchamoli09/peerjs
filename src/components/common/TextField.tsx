import { TextField } from "@mui/material";
import { stringify } from "querystring";
import { useEffect, useState } from "react";


export default function TextFieldTemplate(props: any) {
    const [form, setForm] = useState([] as any);

    function handleFormInput(key: string, value: string) {
        setForm({ ...form, [key]: value });
    }

    useEffect(() => {
        handleFormInput(props.name, props.value);
    }, [props?.value])

    useEffect(() => {
        if (props?.onInputChange)
            props?.onInputChange(form);
    }, [form])

    useEffect(() => {
        if (props?.onGetValues) {
            props?.getValues(form)
        }
    }, [props?.onGetValues])

    return (
        <>
            <TextField id={props.id}
                label={props?.label}
                value={form[props?.name || props?.id]}
                name={props?.name}
                onChange={(e) => handleFormInput(props?.name, e.target.value)}
                sx={props?.sx}
            />
        </>
    )
}
import { TextField } from "@mui/material";
import { stringify } from "querystring";
import { useState } from "react";


export default function TextInputTemplate(props: any) {
    const [form, setForm] = useState([] as any);

    function handleFormInput(key: string, value: string) {
        setForm({ ...form, [key]: value });
        props?.onFormChange(form);
        console.log('form*********************', form);
    }

    return (
        <>
            {
                props?.fields?.map((field: any) => {
                    return (
                        <TextField id={field?.id}
                            label={field?.label}
                            value={form[field?.name]}
                            name={field?.name}
                            onChange={(e) => handleFormInput(field?.name, e.target.value)}
                        />
                    )
                })
            }
        </>
    )
}
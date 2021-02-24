import React from 'react';
import s from './Attachments.module.scss';
import { useDropzone } from 'react-dropzone';

const Attachments = (props) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        disabled: props.disabled || false,
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} байт
        </li>
    ));

    const displayFiles = files.length === 0 ? false : true;

    const filesListElement = displayFiles
        ? <aside>
            <h4 className={s.filesString}>Прикрепленные файлы:</h4>
            <ul>{files}</ul>
        </aside>
        : null;

    return <section className={s.container}>
            <div {...getRootProps({ className: s.dropzone })}>
                <input {...getInputProps()} />
                <p>Перетащите файлы в эту область или кликните для их выбора</p>
            </div>
            {filesListElement}
        </section>;
}

export default Attachments;
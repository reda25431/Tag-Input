import React, { useState, useRef, } from 'react';

const InputFile = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const maxTags = 10;                                                   // จำนวนแท็กสูงสุด
  const separator = /[,;|\/]/;                                          // เครื่องหมายคั่น

  const processAddTag = () => {
    let tag = inputValue.trim().replace(/\s+/g, ' ');                 // ตัดช่องว่าง

    if (tag.length > 0 && tags.length < maxTags) {                    // ตรวจสอบว่า tag ไม่ใช่ค่าว่าง และยังไม่เกินจำนวนสูงสุด
      const newTags = tag
        .split(separator)                                             // แยก tag ตามตัวคั่น
        .map((t: string) => t.trim().toLowerCase())
        .filter((t: string) => t.length > 0 && !tags.includes(t));    // ลบช่องว่าง และลบ tag ที่ซ้ำกัน

      const availableSpace = maxTags - tags.length;
      const tagsToAdd = newTags.slice(0, availableSpace);             // ตรวจสอบจำนวน tag ที่สามารถเพิ่มได้ และตัดให้ไม่เกินที่ตั้ง

      if (tagsToAdd.length > 0) {                                     // เพิ่ม tag ลง state และเคลียร์ input
        setTags((prevTags) => [...prevTags, ...tagsToAdd]);
        setInputValue('');
      }
    }
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processAddTag();
    }
  };
  
  const handleBlur = () => {
    processAddTag();
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));   // ลบแท็กที่ตรงกับค่าที่ส่งเข้ามา
  };

  const removeAllTags = () => {
    setTags([]);                                                            // เคลียร์แท็กทั้งหมด
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const remainingTags = maxTags - tags.length;                              // ใช้คำนวณเพื่อแสดงว่าเหลือแท็กให้เพิ่มได้อีกกี่อัน

  return (
    <div>
      <div className='CardInput'>
        <div className='Title'>
          <h2>Tag Input</h2>
        </div>

        <div className='content'>
          <p>Press enter or add tag</p>
          <ul>
            {/* วนลูปแท็กใน state เพื่อแสดง tag ทีละตัว */}
            {tags.map((tag, index) => (
              <li key={index}>
                {tag}
                <span
                  className='close-tag'
                  onClick={() => removeTag(tag)}
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                >
                  x
                </span>
              </li>
            ))}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={addTag}
              onBlur={handleBlur}
              disabled={remainingTags <= 0}
              placeholder={remainingTags <= 0 ? "Maximum tags" : "Enter Tag"}
            />
          </ul>
        </div>

        <div className='detail'>
          <p>
            <span>{remainingTags}</span> tags are remaining
          </p>
          <button onClick={removeAllTags} disabled={tags.length === 0}>
            Remove All
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputFile
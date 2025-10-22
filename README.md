# Vite 7 (RollDown) + React 19 (React Compiler ) + MUI 5

เป็น Template ที่ตั้งค่าแบบ Minimal สำหรับพัฒนา React บน Vite โดยรองรับ feature WCAG 2

- เปิดใช้ [rolldown-vite](https://vite.dev/guide/rolldown) สำหรับ Fast Refresh
- ติดตั้ง [MUI Version 5](https://v5.mui.com/material-ui/getting-started/) พร้อมใช้งาน

#### คำสั่ง npm ที่จำเป็นต้องใช้งาน

```js
npm i // ดิดตั้ง Package ที่จำเป็นทั้งหมดก่อนเริ่ม

npm run dev // build dev สำหรับขั้นตอนพัฒนา
npm run lint // Run eslint เพื่อตรวจสอบรูปแบบ Code
npm run build // build เพื่อนำไป production ต่อไป
npm run preview // Prview เพื่อทดสอบหลังจาก build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## MUI Version 5

มีการกำหนดค่าเบื้องต้นให้ดังนี้

- ตั้งค่าให้ Font size responsive
- เพิ่มความสามารถในการกำหนด Scale Font ได้ กรณีต้องมีการขยายขนาดตัวอักษร
- เพิ่ม palette High Contrast เพื่อรองรับ WCAG
- แยกไฟล์ theme ไว้ใน Folder theme เพื่อง่ายต่อการเรียกดูและแก้ไขแต่ละส่วน

## React Compiler

มีการเปิดใช้งาน [React Compiler](https://react.dev/learn/react-compiler) ใน Template นี้

## Workspace setting

เพื่อใช้งาน Prettier เป็น formatter มีการกำหนดค่า .vscode/settings.json ไว้ให้แล้ว

## VSCode Extensions

Required เพื่อความเป็นระเบียบ

- Prettier Formatter [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Optional สำหรับช่วย code ได้เร็วขึ้น

- React snippets [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

## ESLint configuration

ใช้ Plug-in [eslint-config-airbnb-extended](https://eslint-airbnb-extended.nishargshah.dev) ในการกำหนดค่า eslint

- อ้างอิง Rule ทั้งหมดจาก airbnb config
- ติดตั้ง [eslint-plugin-prettier](https://prettier.io/docs/integrating-with-linters.html) เป็น Formatter
- มีการ Override Rule บางข้อเพื่อความสะดวกในการพัฒนา

### eslint.config.mjs

รายการRule ที่ Override

```js
// ... ส่วนก่อนหน้าใน eslint.config.mjs
export default [
  // ... config อื่น ๆ
  {
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }], // ให้ <>{code}</> ได้
      '@typescript-eslint/explicit-module-boundary-types': 'off', // ปิดกฎที่บังคับระบุ Return Type
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'object-curly-newline': 'off', // กัน conflict กับ Prettier
      'no-restricted-exports': 'off', // ต้องการ export ด้วยชื่อใดก็ได้
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      // -----> บังคับให้ใช้ Path Import สำหรับ MUI [นำออกได้ถ้าไม่ต้องการลดขนาด bundle]
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@mui/icons-material',
              message:
                'Please import icons directly from their path, e.g. import Icon from "@mui/icons-material/Icon";',
            },
            {
              name: '@mui/material',
              message:
                'Please import components directly from their path, e.g. import Button from "@mui/material/Button";',
            },
            {
              name: '@mui/lab',
              message:
                'Please import components directly from their path, e.g. import Timeline from "@mui/lab/Timeline";',
            },
          ],
        },
      ],
    },
  },
];
```

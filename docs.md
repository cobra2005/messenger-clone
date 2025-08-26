
# Báo cáo giải thích code Next.js + TailwindCSS

## So sánh `className={'...'}` và `className='...'`

- **`className='...'`**
  - Gán trực tiếp một chuỗi tĩnh.
  - Phù hợp khi class không thay đổi.  

- **`className={'...'}`**
  - `{}` cho phép nhúng **biểu thức JavaScript** vào JSX.
  - Có thể gán chuỗi, biến, hoặc dùng toán tử điều kiện.
  - Dùng khi cần class động, ví dụ:
    ```jsx
    <div className={isActive ? 'bg-green-500' : 'bg-red-500'}>Hello</div>
    ```
  - Thường kết hợp với thư viện `clsx` hoặc `classnames`:
    ```jsx
    <div className={clsx('base-class', isActive && 'active-class')} />
    ```

👉 **Tóm lại**  
- Dùng `'...'` khi chỉ cần chuỗi tĩnh.  
- Dùng `{...}` khi cần xử lý động.  

---

## Giải thích code với `next/image` và Tailwind CSS

### Import hình ảnh
```js
import Image from "next/image";
```
- `next/image` là component tối ưu ảnh (lazy load, resize, nén, webp/jpg).  
- Khác với `<img>`, nó giúp tăng hiệu năng và SEO.  

---

### Container chính
```jsx
<div className="
  flex
  min-h-full
  flex-col
  justify-center
  py-12
  sm:px-6
  lg:px-8
  bg-gray-100
">
```
- `flex` → bật **Flexbox**.  
- `min-h-full` → chiều cao tối thiểu = 100%.  
- `flex-col` → sắp xếp con theo cột.  
- `justify-center` → căn giữa theo chiều dọc.  
- `py-12` → padding top/bottom = `48px`.  
- `sm:px-6` → padding trái/phải = `24px` khi màn hình ≥ `640px`.  
- `lg:px-8` → padding trái/phải = `32px` khi màn hình ≥ `1024px`.  
- `bg-gray-100` → nền xám nhạt (`#f3f4f6`).  

👉 **Tác dụng**: Căn giữa form đăng nhập trên toàn màn hình.

---

### Khối chứa logo + tiêu đề
```jsx
<div className="sm:mx-auto sm:w-full sm:max-w-md">
```
- `sm:mx-auto` → căn giữa ngang (margin auto) khi màn hình ≥ `640px`.  
- `sm:w-full` → chiều rộng full khi màn hình ≥ `640px`.  
- `sm:max-w-md` → chiều rộng tối đa = `28rem` (~448px).  

👉 **Tác dụng**: Giúp form gọn gàng, căn giữa.

---

### Logo
```jsx
<Image
  alt="Logo"
  height="48"
  width="48"
  className="mx-auto w-auto"
  src="/images/logo.png"
/>
```
- `src="/images/logo.png"` → đường dẫn ảnh trong thư mục `public/images`.  
- `height`/`width` = 48px.  
- `mx-auto` → căn giữa ngang.  
- `w-auto` → giữ nguyên tỷ lệ ảnh.  

---

### Tiêu đề
```jsx
<h2 className="
  mt-6
  text-center
  text-3xl
  font-bold
  tracking-tight
  text-gray-900
">
  Sign in to your account
</h2>
```
- `mt-6` → margin-top = 24px.  
- `text-center` → căn giữa chữ.  
- `text-3xl` → font-size ≈ 30px, line-height ≈ 36px.  
- `font-bold` → đậm.  
- `tracking-tight` → giảm khoảng cách chữ.  
- `text-gray-900` → màu gần đen (`#111827`).  

👉 **Tác dụng**: Hiển thị tiêu đề đẹp, rõ ràng, nổi bật.  

export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={
        "w-full border ... text-slate-900 placeholder:text-slate-400 " + className
      }
    />
  );
}
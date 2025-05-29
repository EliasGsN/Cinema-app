export function SelectInput({
  options = [],
  value,
  onChange,
  label = "Options",
  id = "inputGroupSelect",
  disabled = false,
}) {
  return (
    <div className="input-group mb-3">
      <select
        className="form-select"
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">Choose...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label className="input-group-text" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

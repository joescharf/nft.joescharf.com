interface SelectorProps {
  options: string[]
  label: string
  value: string
  onChangeHandler: (option: string) => void
}
export default function Selector(props: SelectorProps) {
  const { options, label, value, onChangeHandler } = props
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id="location"
        name="location"
        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value}
        onChange={(e) => onChangeHandler(e.target.value)}
      >
        {options.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </select>
    </div>
  )
}

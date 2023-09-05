import { CheckIcon } from "./Icons";

export function BaseCheckbox({ isChecked, label, onChanged }) {
  return (
    <div class="form-control">
      <label class="cursor-pointer label">
        <input
          type="checkbox"
          class="hidden peer/chk"
          checked={isChecked}
          onChange={onChanged}
        />
        <div className="w-6 h-6 rounded-[6px] border border-gray-200 hover:border-orange-300 peer-checked/chk:bg-orange-500 transition-all">
          {isChecked && (
            <div className="flex w-full h-full items-center justify-center">
              <CheckIcon color="white" />
            </div>
          )}
        </div>
        <span class="label-text pl-2">{label}</span>
      </label>
    </div>
  );
}

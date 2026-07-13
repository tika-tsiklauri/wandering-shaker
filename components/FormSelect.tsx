"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export type FormSelectOption = {
  value: string;
  label: string;
};

type FormSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  options: FormSelectOption[];
  onChange: (name: string, value: string) => void;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  error?: string;
};

export default function FormSelect({
  name,
  label,
  placeholder,
  value,
  options,
  onChange,
  helperText,
  required = false,
  fullWidth = false,
  error,
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const generatedId = useId();
  const buttonId = `${generatedId}-button`;
  const listboxId = `${generatedId}-listbox`;
  const helperId = `${generatedId}-helper`;
  const errorId = `${generatedId}-error`;

  const selectedIndex = options.findIndex((option) => option.value === value);

  const selectedOption =
    selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const describedBy = [helperText ? helperId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;

    optionRefs.current[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex, isOpen]);

  const openMenu = (direction: "first" | "last" | "selected" = "selected") => {
    setIsOpen(true);

    if (direction === "first") {
      setActiveIndex(0);
      return;
    }

    if (direction === "last") {
      setActiveIndex(options.length - 1);
      return;
    }

    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  };

  const selectOption = (option: FormSelectOption) => {
    onChange(name, option.value);
    closeMenu();
  };

  const moveActiveOption = (direction: 1 | -1) => {
    if (!options.length) return;

    setActiveIndex((currentIndex) => {
      if (currentIndex < 0) {
        return direction === 1 ? 0 : options.length - 1;
      }

      return (currentIndex + direction + options.length) % options.length;
    });
  };

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();

        if (!isOpen) {
          openMenu("first");
        } else {
          moveActiveOption(1);
        }

        break;

      case "ArrowUp":
        event.preventDefault();

        if (!isOpen) {
          openMenu("last");
        } else {
          moveActiveOption(-1);
        }

        break;

      case "Home":
        if (!isOpen) return;

        event.preventDefault();
        setActiveIndex(0);
        break;

      case "End":
        if (!isOpen) return;

        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;

      case "Enter":
      case " ":
        event.preventDefault();

        if (!isOpen) {
          openMenu();
        } else if (activeIndex >= 0) {
          selectOption(options[activeIndex]);
        }

        break;

      case "Escape":
        if (!isOpen) return;

        event.preventDefault();
        closeMenu();
        break;

      case "Tab":
        setIsOpen(false);
        setActiveIndex(-1);
        break;

      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col gap-1 ${
        fullWidth ? "md:col-span-2" : ""
      }`}
    >
      <label
        id={`${generatedId}-label`}
        htmlFor={buttonId}
        className="font-secondary text-sm leading-snug text-[#354f32]/75"
      >
        {label}
        {required && <span className="sr-only"> Required</span>}
      </label>

      {helperText && (
        <p
          id={helperId}
          className="font-secondary text-xs leading-relaxed text-[#354f32]/60"
        >
          {helperText}
        </p>
      )}

      <input type="hidden" name={name} value={value} />

      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-labelledby={`${generatedId}-label ${buttonId}`}
        aria-describedby={describedBy || undefined}
        aria-activedescendant={
          isOpen && activeIndex >= 0
            ? `${generatedId}-option-${activeIndex}`
            : undefined
        }
        aria-invalid={Boolean(error)}
        aria-required={required}
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
        onKeyDown={handleButtonKeyDown}
        className={`flex min-h-[42px] w-full items-center justify-between gap-4 rounded-md border bg-white/70 px-3 py-2 text-left font-secondary text-base outline-none transition ${
          error
            ? "border-red-700/70 focus:border-red-700 focus:ring-1 focus:ring-red-700/40"
            : "border-[#c7b8a2]/70 focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
        }`}
      >
        <span
          className={
            selectedOption
              ? "truncate text-[#354f32]"
              : "truncate text-[#354f32]/45"
          }
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <svg
          className={`h-4 w-4 shrink-0 text-[#354f32]/70 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={`${generatedId}-label`}
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-72 overflow-y-auto rounded-md border border-[#c7b8a2]/70 bg-[#f8f5ef] p-1.5 shadow-[0_14px_35px_rgba(53,79,50,0.14)]"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <button
                key={option.value}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                id={`${generatedId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={() => selectOption(option)}
                className={`flex w-full items-start justify-between gap-4 rounded px-3 py-2.5 text-left font-secondary text-sm leading-snug transition ${
                  isActive
                    ? "bg-[#e9e2d0]/80 text-[#354f32]"
                    : "text-[#354f32]/85 hover:bg-[#e9e2d0]/60"
                }`}
              >
                <span>{option.label}</span>

                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center ${
                    isSelected ? "text-[#354f32]" : "text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <path
                      d="M4.5 10.5L8 14L15.5 6.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p id={errorId} className="mt-1 font-secondary text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

import {LocalDate, LocalTime} from "@/utils/baseTypes";

export function capitalize(word: string) {
  const first = word.charAt(0)
  const rest = word.slice(1)
  return first.toUpperCase() + rest.toLowerCase()
}

export function dateAsString(localDate: LocalDate) {
  return `${localDate.dayOfMonth} ${capitalize(localDate.month)} ${localDate.year}`
}

export function timeAsString(localTime: LocalTime) {
  const period = localTime.hour >= 12 ? "pm" : "am"
  let hour = localTime.hour

  if (hour == 0) {
    hour = 12
  } else {
    if (period == "pm" && hour > 12) {
      hour = hour - 12
    }
  }

  return `${hour.toString().padStart(2, "0")}:${localTime.minute.toString().padStart(2, "0")} ${period}`
}
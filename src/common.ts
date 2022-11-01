export type WithTarget<Event, Target> = Event & { currentTarget: Target }

export function saveToDisc(data: string, filename: string, type: string) {
  const file = new Blob([data], {type: type})

  if ((window.navigator as any).msSaveOrOpenBlob) // IE10+
    (window.navigator as any).msSaveOrOpenBlob(file, filename)
  else { // Others
      const a = document.createElement("a")
      const url = URL.createObjectURL(file)
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      setTimeout(function() {
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
      }, 0)
  }
}

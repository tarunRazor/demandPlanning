import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default  function ToggleSwitch () {
  const [enabled, setEnabled] = useState(false)


    return (
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? 'bg-primary' : 'bg-gray-200',
            'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0  focus:ring-offset-0'
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
  )
}

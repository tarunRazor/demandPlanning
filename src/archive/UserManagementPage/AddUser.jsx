import { React, useState } from "react";
import LeftArrow from "../../assets/icons/LeftArrow";
import InputGroup from "../../components/common/InputGroup";
import SelectBox from "../../components/common/SelectDropdown";
import ToggleSwitch from "../../components/common/Toggle";

const Apps = [
  {
    name: "Vendor Portal",
    proxy: [
      { name: "Vendor Proxy" },
      { name: "Can invite an external vendor" },
    ],
  },
  { name: "Portfolio Steering" },
  { name: "Prime Pilot" },
];

function AddUser({ setAddUser,setToast }) {
  const [selectedRole, setSelectedRole] = useState("");
  const handleAddUser = () => {
    setToast(true)
    setAddUser(false)
    }
  return (
    <div>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setAddUser(false)}
        >
          <LeftArrow />
          <h1 className="text-title font-bold ml-2">Add users</h1>
        </div>

        <button className="btn btn-primary" onClick={()=> handleAddUser()}>Send Invite</button>
      </div>
      <div className=" rounded-lg h-max relative bg-white  shadow-sm ring-1 ring-border-subtle lg:grid-cols-2 overflow-hidden mt-8">
        <div className="py-2 rounded-tl-lg rounded-tr-lg px-3 items-center   bg-background-alt border-b border-border-subtle">
          <h1> User Details</h1>
          <p>
            Add users and choose what they can access. Enter multiple emails to
            invite several users at once.
          </p>
        </div>

        <div className="p-4 mt-3 mb-3">
          <p className="mb-3">STEP I: Contact Details</p>
          <InputGroup
            type={"email"}
            label="Email"
            placeholder="Enter email address"
            value={
              "need vendor ID for vendors - User ID - Netsuite ID (internal members)"
            }
          />
        </div>
      </div>

      <div className="p-4 rounded-lg h-max relative bg-white  shadow-sm ring-1 ring-border-subtle lg:grid-cols-2  mt-8">
        <p className="mb-3">STEP II: Contact Details</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-2 pb-4">
          {Apps.map((app, index) => (
            <div
              className={`flex pr-5 border-border-subtle flex-col ${
                (index + 1) % 3 !== 0 ? "border-r" : ""
              }`}
              key={app.name}
            >
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name={app.name}
                  className="rounded text-primary focus:outline-none focus:ring-0 focus:ring-offset-0"
                />
                <h1 className="ml-2">{app.name}</h1>
              </div>

              <SelectBox
                label="Role"
                defaultText="Select User Role"
                listValue={[
                  "Supply Manager",
                  "Procurement Team",
                  "Sale Price Manager",
                  "Image Quality Team",
                  "Inventory Manager",
                ]}
                selected={selectedRole}
                setSelected={setSelectedRole}
              />

              {app.name === "Vendor Portal" && (
                <div className="mt-6">
                  {app.proxy.map((proxy, index) => (
                    <div className="flex items-center mb-2" key={proxy.name}>
                      <p className="mr-3">{proxy.name}</p>
                      <ToggleSwitch />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddUser;

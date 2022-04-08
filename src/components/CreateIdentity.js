import React, { useState } from "react";

export default function CreateIdentity({ mint }) {
  const [addressId, setAddressId] = useState("");
  const [idType, setIdType] = useState("individual");
  const [orgType, setOrgType] = useState("");

  return (
    <div className='row'>
      <main role='main' className='col-lg-12 d-flex text-center'>
        <div className='content mr-auto ml-auto' style={{ opacity: "0.8" }}>
          <h1 style={{ color: "black" }}>Issue Identity</h1>
          <form
            onSubmit={event => {
              event.preventDefault();
              console.log("addressId", addressId);
              console.log("idType", idType);
              console.log("orgType", orgType);
              mint(addressId, idType, orgType);
            }}
          >
            <input
              type='text'
              placeholder='Address'
              className='form-control mb-1'
              onChange={e => setAddressId(e.target.value)}
            />
            <select
              name='idType'
              id='idType'
              className='form-control mb-1'
              onChange={e => setIdType(e.target.value)}
            >
              <option value='individual'>Individual</option>
              <option value='organization'>Organization</option>
            </select>
            {idType === "organization" ? (
              <select
                name='orgType'
                id='orgType'
                className='form-control mb-1'
                onChange={e => setOrgType(e.target.value)}
              >
                <option value='agency'>Agency</option>
                <option value='company'>Company</option>
                <option value='guild'>Guild</option>
              </select>
            ) : null}
            <input
              style={{ margin: "6px" }}
              type='submit'
              className='btn btn-primary btn-black'
              value='Issue'
            />
          </form>
        </div>
      </main>
    </div>
  );
}

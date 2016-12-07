import React from 'react'
import { Form, Text } from 'react-form'

export default const SearchSubmitForm = Form({
  validate: values => {
    return {
      firstName: !values.firstName ? 'Required' : undefined,
      lastName: !values.lastName ? 'Required' : undefined,
      hobby: !values.hobby ? 'Required' : undefined
    }
  }
})(({ submitForm }) => {
  return (
    <form onSubmit={submitForm}>
      <Text
        field='firstName'
        placeholder='First Name'
      />
      <Text
        field='lastName'
        placeholder='Last Name'
      />
      <Text
        field='hobby'
        placeholder='Hobby'
      />
      <Select
        field='status'
        options={[{
          label: 'Available',
          value: 'available'
        }, {
          label: 'Unavailable',
          value: 'unavailable'
        }]}
      />
      <Textarea
        field='notes'
        placeholder='Notes'
      />
      <button>
        Submit
      </button>
    </form>
  )
})

/* export default props => {
  return (
    <SearchSubmitForm
      onSubmit={(values) => {
        window.alert(JSON.stringify(values, null, 2))
      }}
    />
  )
} */
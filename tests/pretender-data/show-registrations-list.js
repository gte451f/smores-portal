/**
 * ember pretender dataset
 * for a specific test case
 */
export default {
  // a basic result set for the member page
  registrations: {
    "registrations": [{
      "id": "17",
      "attendee_id": "195",
      "notes": "Here are important notes for camp staff.",
      "created_on": "2015-10-31 13:00:10",
      "updated_on": null,
      "request_ids": ["39", "40", "41"]
    }],
    "requests": [{
      "id": "39",
      "registration_id": "17",
      "event_id": "26",
      "priority": "3",
      "submit_status": "New",
      "attending": "0",
      "note": null
    }, {
      "id": "40",
      "registration_id": "17",
      "event_id": "5",
      "priority": "1",
      "submit_status": "New",
      "attending": "0",
      "note": null
    }, {
      "id": "41",
      "registration_id": "17",
      "event_id": "19",
      "priority": "2",
      "submit_status": "New",
      "attending": "0",
      "note": null
    }],
    "attendees": [{
      "user_id": "195",
      "account_id": "95",
      "school_grade": "6th",
      "medical_notes": null,
      "allergy_notes": null,
      "general_notes": null,
      "id": "195",
      "first_name": "Ann",
      "last_name": "Shelton",
      "email": "auctor@sagittissemper.co.uk",
      "user_type": "Attendee",
      "dob": "2005-06-16",
      "gender": "Female",
      "password": null,
      "code": null,
      "active": "1",
      "token": null,
      "token_created_on": null
    }]
  }

}
export class ProfileSerializer {
  static fromAPIToView = (data={}) => {
    return {
      profileRole: data.role,
      name: data.name,
      birthDate: new Date(data.birth_date),
      pictsOnRegister: {
        documentID: data.doc_id_photo_url,
        profilePhoto: data.profile_photo_url
      },
      account: {
        email: '',
        password: ''
      },
      services: [],
      time: {
        start: data.available_hour_from,
        end: data.available_hour_to
      }
    }
  }

  static fromViewToAPI = (data={}) => {
    return {
      role: data.profileRole,
      rate: data.rate || 5,
      profile_description: data.description || 'Default description',
      birth_date: formatDate(data.birthDate, 'api'),
      available_hour_from: formatTime(data.time.start),
      available_hour_to: formatTime(data.time.end),
      languages: [DEFAULT_LANG.id],
      services: [
        ...data.services.map(service => {
          return this.props.careServicesAPI[service.name].id;
        })
      ],
      experience: data.experience || 'Default experience',
      user: data.id,
      id_doc_photo: docID.data,
      profile_photo: profilePhoto.data
    }
  }
}

import formatDate from './TimeUtilsProvider';

export class ProfileSerializer {
  static fromAPIToView = (data={}) => {
    return {
      id: data.id,
      profileRole: data.role,
      name: data.name,
      username: data.username,
      rate: data.rate,
      birthDate: data.birth_date,
      description: data.profile_description,
      contractWithCurrentProfile: data.contractWithCurrentProfile,
      experience: data.experience,
      pictsOnRegister: {
        documentID: data.doc_id_photo_url,
        profilePhoto: data.profile_photo_url
      },
      account: {
        email: '',
        password: ''
      },
      available_time: data.available_time,
      services: data.services,
      languages: data.languages,
      time: {
        start: data.available_hour_from,
        end: data.available_hour_to
      },
      profileStatus: {...data.profile_status}
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

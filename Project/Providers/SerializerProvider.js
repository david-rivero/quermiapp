import { formatDate, formatTime, getDateTimeFromStr } from './TimeUtilsProvider';

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

  static fromViewToAPI = (data={}, careServices, user, lang) => {
    const objBirthDate = getDateTimeFromStr(data.birthDate, 'dd/MM/yyyy');
    const DEFAULT_PROFILE_RATE = 5;

    return {
      role: data.profileRole,
      rate: DEFAULT_PROFILE_RATE,
      profile_description: data.description || 'Default description',
      birth_date: `${formatDate(objBirthDate, 'api')}Z`,
      available_hour_from: data.time.start,
      available_hour_to: data.time.end,
      languages: [lang.id],
      services: [
        ...data.services.map(service => {
          return careServices[service.name].id;
        })
      ],
      experience: data.experience || 'Default experience',
      user: user.id,
      id_doc_photo: data.pictsOnRegister.documentID.data,
      profile_photo: data.pictsOnRegister.profilePhoto.data,
      profile_status: { ...data.profileStatus }
    }
  }
}

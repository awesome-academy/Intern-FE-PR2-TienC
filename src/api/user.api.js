import http from 'src/utils/http'

const URL = 'user'

export const userApi = {
  updateProfile(data) {
    return http.put(URL, data)
  }
}

const apiUrl: string = 'https://api.umiter.ru/v1/' 

export async function fetchApi<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${apiUrl}${path}`, init)
        return await response.json()
  }

  export async function fetchApiResponse(
    path: string,
    init?: RequestInit,
  ) {
    const response = await fetch(`${apiUrl}${path}`, init)
    return response
  }


interface CodeData {
    recipient: string, 
    code: string,
    linkId: string
}


export async function checkCorrectCode(data: CodeData) {
    return await fetchApiResponse(`public/phone/verifications/attempts`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }



interface PhoneData {
    recipient: string, 
    linkId: string,
    validate: boolean
}

export async function getPhoneCode(data: PhoneData) {
    return await fetchApiResponse(`public/phone/verifications/call/requests`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },

    })
  }

export async function checkLinkId(linkId: string) {
    return await fetchApiResponse(`public/terrarium?linkId=${linkId}`)
  }

export async function getTerrariumSettings(linkId: string, token: string) {
    return await fetchApi(`terrarium/settings/${linkId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          }
    })
  }

export async function getLastTerrariumLogs(from: string, linkId: string, token: string) {
    return await fetchApiResponse(`log?from=${from}&terId=${linkId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          
    })
  }


export async function getLastTerrariumLog(linkId: string, token: string) {
    return await fetchApiResponse(`log/last?terId=${linkId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          }
    })
  }

export async function getProfiles(token: string, terrariumId: string) {
    return await fetchApiResponse(`profile?type=all&terId=${terrariumId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          }
    })
  }

export async function getTimezones(token: string) {
    return await fetchApiResponse(`terrarium/timezone`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          }
    })
  }

interface profileCreationData {
  terId: string,
  name: string,
  settings: {
      temperature_hot_night: string,
      temperature_hot_day: string,
      light_start_time: string,
      light_stop_time: string
  }
}

export async function createProfile(token: string, data: profileCreationData) {
    return await fetchApiResponse(`profile`, {
        method: 'POST',

        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data)
    })
  }

export async function setTerrariumProfile(terId: string, profileId: string, token: string) {
    return await fetchApiResponse(`terrarium/${terId}/profile/${profileId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

export async function deleteTerrarium(terId: string, token: string) {
    return await fetchApiResponse(`user/terrarium/${terId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }

export async function createTerrarium(token: string, linkId) {
    return await fetchApiResponse(`user/terrarium?linkId=${linkId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  }

export async function refreshTokens(data) {
    return await fetchApiResponse(`public/user/auth/refresh/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }


export async function deleteTerrariumProfile(terId: string, token: string) {
    return await fetchApiResponse(`admin/terrarium/${terId}/profile`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',

      }
    })
  }


export async function updateTimezone(newTimezone: string, terId: string, token: string) {
    return await fetchApiResponse(`terrarium/${terId}/timezone?newTimezone=${newTimezone}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,

      }
    })
  }

export async function updateName(newName: string, terId: string, token: string) {
    return await fetchApiResponse(`terrarium/${terId}/name?newName=${newName}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',

      }
    })
  }
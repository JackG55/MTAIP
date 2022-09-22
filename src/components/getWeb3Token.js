import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM0NzMyNjA2ZDU1MmI1MUIxOUJGQjM4QmM5RmZGNjZmMjcwYjQ3MkIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjMwODYyMTM3ODMsIm5hbWUiOiJNVEFJUCJ9.we6MoKCTAgAkgBsirN_fLFMPzpJFFdOPnqdDDl8PneY'
}

export default function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}
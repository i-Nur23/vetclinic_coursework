cd vet-clinic.frontend
call npm run build
cd ../vet-clinic.backend
call npm run build
cd..
move vet-clinic.frontend/build_client vet-clinic.backend/build/
cd vet-clinic.backend
npm start
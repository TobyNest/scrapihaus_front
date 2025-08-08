import { History } from '@/app/types/history'

export const historyMock: History[] = [
  {
    tipo: 'Apartamento',
    quartos: 2,
    banheiros: 1,
    vagas_garagem: 1,
    data_pesquisa: new Date('2025-08-01T10:30:00Z'),
    bairro: 'Vila Sônia',
    area_max: 20,
    area_min: 40
  },
  {
    tipo: 'Casa',
    quartos: 3,
    banheiros: 2,
    vagas_garagem: 2,
    data_pesquisa: new Date('2025-07-25T15:45:00Z'),
    area_max: 60,
    area_min: 60
  },
  {
    tipo: 'Terreno/Lote',
    data_pesquisa: new Date('2025-07-20T08:00:00Z'),
    bairro: 'Bom Retiro',
    area_max: 120,
    area_min: 140
  },
  {
    tipo: 'Apartamento',
    quartos: 1,
    data_pesquisa: new Date('2025-07-15T12:00:00Z')
  },
  {
    tipo: 'Casa',
    banheiros: 1,
    data_pesquisa: new Date('2025-07-10T09:10:00Z')
  },
  {
    tipo: 'Apartamento',
    vagas_garagem: 1,
    data_pesquisa: new Date('2025-07-05T18:20:00Z'),
    bairro: 'Pinheiros'
  },
  {
    tipo: 'Casa',
    quartos: 4,
    banheiros: 3,
    data_pesquisa: new Date('2025-07-01T07:15:00Z')
  },
  {
    tipo: 'Terreno/Lote',
    data_pesquisa: new Date('2025-06-28T11:30:00Z')
  },
  {
    tipo: 'Apartamento',
    quartos: 2,
    banheiros: 2,
    vagas_garagem: 1,
    data_pesquisa: new Date('2025-06-20T16:40:00Z')
  },
  {
    tipo: 'Casa',
    data_pesquisa: new Date('2025-06-15T14:00:00Z')
  }
]

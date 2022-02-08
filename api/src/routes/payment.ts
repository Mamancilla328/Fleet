import { Response, Request, Router, NextFunction } from 'express';
import { Signup } from '../models/Signup';
import { Carrier }  from '../models/Carrier';

const mercadopago = require('mercadopago');

const router=Router()

router.get('/payment', async (req: Request, res: Response) => {
    res.send('Allan Torres line 15');
  });

router.post('/mercadopago', async (req, res) => {
    const { title, unit_price } = req.body;
    console.log(req.body)
    try{
  
  
    mercadopago.configure({
        access_token: 'TEST-4261065072334441-020320-579a9756136c4e30a0ce0b4f11322878-177928098',
    });
  
    let preference = {
        items: [
            {
                title,
                unit_price,
                quantity: 1,
            },
        ],
    };
  
    let answer = await mercadopago.preferences.create(preference);
  
    const response = answer.body.id;  
    const init_points = answer.body.init_point;
  
    res.json({ response, init_points });
  
  }catch(err){
    console.error(err)
  }
  });
  export default router
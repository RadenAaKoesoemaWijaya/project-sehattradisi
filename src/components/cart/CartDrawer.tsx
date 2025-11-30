import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, services, providers, removeFromCart, getCartTotal } = useApp();
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag size={24} />
            <h2 className="text-lg font-semibold">Keranjang Belanja</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Keranjang belanja Anda kosong</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item: any) => {
                const service = services.find((s) => s.id === item.serviceId);
                const provider = item.providerId
                  ? providers.find((p) => p.id === item.providerId)
                  : null;

                return (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex gap-4">
                      <img
                        src={service?.image}
                        alt={service?.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{service?.name}</h3>
                        {provider && (
                          <p className="text-sm text-gray-600">
                            Terapis: {provider.name}
                          </p>
                        )}
                        {item.date && item.time && (
                          <p className="text-sm text-gray-600">
                            {new Date(item.date).toLocaleDateString('id-ID')} -{' '}
                            {item.time}
                          </p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-medium">
                            Rp{item.price.toLocaleString('id-ID')}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total</span>
              <span className="text-xl font-semibold">
                Rp{getCartTotal().toLocaleString('id-ID')}
              </span>
            </div>
            <button
              className="btn btn-primary w-full justify-center"
              onClick={() => {
                if (cart.length === 0) {
                  alert('Keranjang Anda kosong!');
                  return;
                }
                navigate('/booking');
              }}
            >
              Lanjutkan ke Pembayaran
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
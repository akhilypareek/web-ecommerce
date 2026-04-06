import Button from "../Controls/Button";

interface PriceFilterProps {
  minPrice: string;
  maxPrice: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  handlePriceChange: (min?: string, max?: string) => void;
  onPriceApply?: () => void;
  isMobile?: boolean;
}

function PriceFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  handlePriceChange,
  onPriceApply,
  isMobile = false
}:PriceFilterProps) {
  const handleMobilePriceSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePriceChange();
    if (onPriceApply) onPriceApply();
  };


  return (
    <section className={`${isMobile ? '' : 'md:sticky top-20 h-fit'} space-y-6`} aria-labelledby={`${isMobile ? 'mobile-' : ''}price-filter-heading`}>
      <div className="space-y-2">
        <div
          className="flex justify-between items-center"
        >

          <h3
            id={`${isMobile ? 'mobile-' : ''}price-filter-heading`}
            className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold mb-${isMobile ? '3' : '5'} text-gray-700 ${!isMobile ? 'tracking-wide' : ''}`}
          >
            Price Filter
          </h3>
         
          {(minPrice || maxPrice) && (
            <div
              className="text-red-500 text-sm cursor-pointer hover:underline"
              onClick={() => {
                setMinPrice('');
                setMaxPrice('');

                handlePriceChange('', '');

                if (onPriceApply) onPriceApply(); 
              }}
            >
              Clear Filter
            </div>
          )}
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-2 border border-gray-200">
          <form
            className="space-y-2"
            onSubmit={isMobile ? handleMobilePriceSubmit : (e) => { e.preventDefault(); handlePriceChange(); }}
          >
            <div>
              <label htmlFor={`${isMobile ? 'mobile-' : ''}min-price`} className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                id={`${isMobile ? 'mobile-' : ''}min-price`}
                type="number"
                value={minPrice}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full p-3 rounded-xl border bg-white/50 text-gray-700"
                min="0"
                aria-describedby={`${isMobile ? 'mobile-' : ''}min-price-help`}
              />
              <span id={`${isMobile ? 'mobile-' : ''}min-price-help`} className="sr-only">
                Enter minimum price to filter products
              </span>
            </div>

            <div>
              <label htmlFor={`${isMobile ? 'mobile-' : ''}max-price`} className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                id={`${isMobile ? 'mobile-' : ''}max-price`}
                type="number"
                value={maxPrice}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)}
                placeholder="1000"
                className="w-full p-3 rounded-xl border bg-white/50 text-gray-700"
                min="0"
                aria-describedby={`${isMobile ? 'mobile-' : ''}max-price-help`}
              />
              <span id={`${isMobile ? 'mobile-' : ''}max-price-help`} className="sr-only">
                Enter maximum price to filter products
              </span>
            </div>

            <Button
              text="Apply Price Filter"
              onClick={isMobile ? () => {
                if (minPrice === '') setMinPrice('0');
                handlePriceChange();
                if (onPriceApply) onPriceApply();
              } : () => {
                if (minPrice === '') setMinPrice('0');
                handlePriceChange();
              }}

            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default PriceFilter;
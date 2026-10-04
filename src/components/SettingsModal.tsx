import React, { useState } from 'react';
import { AuthUser, UserRole, HogwartsHouse } from '../types';
import { HOGWARTS_HOUSES } from '../data/houses';
import { HouseCrest } from './HouseCrest';
import { X, ShieldCheck, User, Compass, Check, LogOut, Lock, ArrowRight, Eye, ShieldAlert } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser;
  onLogout: () => void;
  onOpenAdminConsole: (initialTab?: 'inventory' | 'orders') => void;
  onSwitchRole: (newRole: UserRole) => void;
  totalVolumesCount: number;
  totalOrdersCount: number;
  currentHouse: HogwartsHouse;
  onSelectHouse: (house: HogwartsHouse) => void;
  userPoints?: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onOpenAdminConsole,
  onSwitchRole,
  totalVolumesCount,
  totalOrdersCount,
  currentHouse,
  onSelectHouse,
  userPoints = 150,
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'experience' | 'house' | 'curator'>('experience');
  const [deniedMessage, setDeniedMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeHouseData = HOGWARTS_HOUSES[currentHouse];
  const isCuratorAdmin = currentUser.role === 'curator-admin' || currentUser.role === 'admin';
  const isTrailer = currentUser.role === 'trailer';

  // Normalize role string for display
  const currentRoleNormalized: 'patron' | 'trailer' | 'curator-admin' = 
    isCuratorAdmin ? 'curator-admin' : isTrailer ? 'trailer' : 'patron';

  const handleSelectRole = (newRole: UserRole) => {
    onSwitchRole(newRole);
    setDeniedMessage(null);
  };

  const handleCuratorTabClick = () => {
    if (!isCuratorAdmin) {
      setDeniedMessage('ACCESS DENIED: CURATOR ADMIN clearance required. Switch your Experience Mode to CURATOR ADMIN first.');
      return;
    }
    setActiveTab('curator');
    setDeniedMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 select-none animate-fadeIn">
      
      {/* Dark Ambient Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Pop-up Dialog: Clean Editorial Style */}
      <div className="relative z-10 bg-white border border-[#E8E5DF] rounded-[3px] shadow-2xl max-w-xl w-full overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-white border-b border-[#E8E5DF] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HouseCrest house={currentHouse} size={20} />
            <div>
              <h3 className="font-serif font-bold text-lg text-[#16120F] uppercase tracking-wide">
                SETTINGS &amp; ARCHIVAL IDENTITY
              </h3>
              <p className="text-[10px] font-mono text-[#6B6359]">
                {houseDataName(currentHouse)} · {userPoints} HOUSE POINTS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#6B6359] hover:text-[#16120F] p-1.5 transition-colors cursor-pointer select-none"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E5DF] bg-[#F8F7F4] text-xs font-mono px-6">
          <button
            onClick={() => { setActiveTab('experience'); setDeniedMessage(null); }}
            className={`py-3 px-3 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'experience'
                ? 'border-[#16120F] text-[#16120F] font-bold bg-white'
                : 'border-transparent text-[#6B6359] hover:text-[#16120F]'
            }`}
          >
            EXPERIENCE MODE
          </button>

          <button
            onClick={() => { setActiveTab('house'); setDeniedMessage(null); }}
            className={`py-3 px-3 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'house'
                ? 'border-[#16120F] text-[#16120F] font-bold bg-white'
                : 'border-transparent text-[#6B6359] hover:text-[#16120F]'
            }`}
          >
            HOUSE &amp; POINTS
          </button>

          <button
            onClick={() => { setActiveTab('account'); setDeniedMessage(null); }}
            className={`py-3 px-3 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'account'
                ? 'border-[#16120F] text-[#16120F] font-bold bg-white'
                : 'border-transparent text-[#6B6359] hover:text-[#16120F]'
            }`}
          >
            ACCOUNT
          </button>

          <button
            onClick={handleCuratorTabClick}
            className={`py-3 px-3 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'curator'
                ? 'border-[#16120F] text-[#16120F] font-bold bg-white'
                : isCuratorAdmin
                ? 'border-transparent text-[#6B6359] hover:text-[#16120F]'
                : 'border-transparent text-[#9E978E] hover:text-[#7A1018]'
            }`}
          >
            {!isCuratorAdmin && <Lock className="w-3 h-3 text-[#9E978E]" />}
            <span>CURATOR ADMIN</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Access Denied Warning Toast */}
          {deniedMessage && (
            <div className="bg-[#FAF0E6] border border-[#7A1018] p-3 rounded-[2px] text-xs font-mono text-[#7A1018] flex items-start gap-2 animate-fadeIn">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{deniedMessage}</span>
            </div>
          )}

          {/* TAB 1: EXPERIENCE MODE SWITCHING */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-base text-[#16120F] uppercase tracking-wide">
                  EXPERIENCE MODE
                </h4>
                <p className="text-xs text-[#6B6359] mt-0.5">
                  Select your active operational clearance. Permissions and features update immediately.
                </p>
              </div>

              {/* Radio-Card Interface */}
              <div className="space-y-2.5">
                {/* 1. PATRON */}
                <div
                  onClick={() => handleSelectRole('patron')}
                  className={`p-4 rounded-[2px] border cursor-pointer transition-all ${
                    currentRoleNormalized === 'patron'
                      ? 'border-[#16120F] bg-[#F8F7F4] shadow-xs'
                      : 'border-[#E8E5DF] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        currentRoleNormalized === 'patron' ? 'border-[#16120F]' : 'border-[#A8A196]'
                      }`}>
                        {currentRoleNormalized === 'patron' && <div className="w-2 h-2 rounded-full bg-[#16120F]" />}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-sm text-[#16120F] uppercase">PATRON</div>
                        <div className="text-[11px] font-mono text-[#6B6359]">Reader &amp; customer experience</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#6B6359]">STANDARD</span>
                  </div>
                  <p className="text-xs text-[#524B43] mt-2.5 pl-6 leading-relaxed">
                    Full patron privileges: browsing physical archival folios, customizing Ex-Libris bookplates, accumulating house points, and purchasing merchandise.
                  </p>
                </div>

                {/* 2. TRAILER */}
                <div
                  onClick={() => handleSelectRole('trailer')}
                  className={`p-4 rounded-[2px] border cursor-pointer transition-all ${
                    currentRoleNormalized === 'trailer'
                      ? 'border-[#16120F] bg-[#F8F7F4] shadow-xs'
                      : 'border-[#E8E5DF] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        currentRoleNormalized === 'trailer' ? 'border-[#16120F]' : 'border-[#A8A196]'
                      }`}>
                        {currentRoleNormalized === 'trailer' && <div className="w-2 h-2 rounded-full bg-[#16120F]" />}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-sm text-[#16120F] uppercase">TRAILER</div>
                        <div className="text-[11px] font-mono text-[#6B6359]">Preview experience</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#6B6359]">RESTRICTED</span>
                  </div>
                  <p className="text-xs text-[#524B43] mt-2.5 pl-6 leading-relaxed">
                    Restricted preview mode intended for demonstration and guided walkthroughs. Administrative modifications are restricted.
                  </p>
                </div>

                {/* 3. CURATOR ADMIN */}
                <div
                  onClick={() => handleSelectRole('curator-admin')}
                  className={`p-4 rounded-[2px] border cursor-pointer transition-all ${
                    currentRoleNormalized === 'curator-admin'
                      ? 'border-[#16120F] bg-[#F8F7F4] shadow-xs'
                      : 'border-[#E8E5DF] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        currentRoleNormalized === 'curator-admin' ? 'border-[#16120F]' : 'border-[#A8A196]'
                      }`}>
                        {currentRoleNormalized === 'curator-admin' && <div className="w-2 h-2 rounded-full bg-[#16120F]" />}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-sm text-[#16120F] uppercase">CURATOR ADMIN</div>
                        <div className="text-[11px] font-mono text-[#6B6359]">Editorial administration</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#7A1018] font-bold">ELEVATED ACCESS</span>
                  </div>
                  <p className="text-xs text-[#524B43] mt-2.5 pl-6 leading-relaxed">
                    Unrestricted archival oversight: dynamic book stock management, price adjustments, dispatch order fulfillment, and curatorial analytics.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOUSE IDENTITY & PERSISTENT SWITCHING */}
          {activeTab === 'house' && (
            <div className="space-y-5">
              {/* Current House Banner */}
              <div className="p-4 bg-[#F8F7F4] border border-[#E8E5DF] rounded-[2px] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#6B6359]">CURRENT HOUSE</div>
                  <div className="font-serif font-bold text-xl text-[#16120F] mt-0.5">
                    {activeHouseData.name.toUpperCase()}
                  </div>
                  <div className="text-[11px] font-mono text-[#6B6359]">
                    {activeHouseData.motto}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-[#6B6359]">HOUSE POINTS</div>
                  <div className="font-mono text-xl font-bold text-[#16120F]">
                    {userPoints} PTS
                  </div>
                </div>
              </div>

              {/* Change House Selection */}
              <div>
                <h4 className="font-serif font-bold text-sm text-[#16120F] uppercase tracking-wide mb-2">
                  CHANGE HOUSE
                </h4>
                <p className="text-xs text-[#6B6359] mb-3">
                  Switch your house membership. Updates colors, silk pennant flag, and catalog highlights immediately.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {(['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'] as HogwartsHouse[]).map((hKey) => {
                    const h = HOGWARTS_HOUSES[hKey];
                    const isSelected = currentHouse === hKey;
                    return (
                      <button
                        key={hKey}
                        type="button"
                        onClick={() => onSelectHouse(hKey)}
                        className={`p-3.5 rounded-[2px] border text-left cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-white border-[#16120F] shadow-sm ring-1 ring-[#16120F]'
                            : 'bg-[#F8F7F4] hover:bg-white border-[#E8E5DF] text-[#6B6359]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <HouseCrest house={hKey} size={22} />
                          <div>
                            <div className="font-serif font-bold text-xs uppercase leading-tight text-[#16120F]">
                              {h.name}
                            </div>
                            <div className="text-[9px] font-mono text-[#6B6359]">
                              {h.traits.slice(0, 2).join(' · ')}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#16120F]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACCOUNT PROFILE */}
          {activeTab === 'account' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-base text-[#16120F] uppercase tracking-wide">
                  PATRON ACCOUNT
                </h4>
                <p className="text-xs text-[#6B6359] mt-0.5">
                  Archival account information and cryptographic session data.
                </p>
              </div>

              <div className="bg-[#F8F7F4] border border-[#E8E5DF] rounded-[2px] p-4 space-y-3 text-xs font-mono">
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span className="text-[#6B6359]">NAME:</span>
                  <span className="font-bold text-[#16120F]">{currentUser.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span className="text-[#6B6359]">EMAIL:</span>
                  <span className="text-[#16120F]">{currentUser.email}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span className="text-[#6B6359]">CLEARANCE MODE:</span>
                  <span className="font-bold text-[#16120F]">{currentRoleNormalized.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span className="text-[#6B6359]">HOUSE MEMBERSHIP:</span>
                  <span className="font-bold text-[#16120F]">{activeHouseData.name.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6359]">LEDGER POINTS:</span>
                  <span className="font-bold text-[#16120F]">{userPoints} POINTS</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full bg-[#16120F] hover:bg-black text-white text-xs font-mono uppercase tracking-wider py-3 rounded-[2px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-[#A88A45]" />
                  <span>SIGN OUT OF DESK</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: CURATOR ADMIN (Only accessible if curator-admin) */}
          {activeTab === 'curator' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#16120F] uppercase tracking-wide">
                    CURATORIAL DESK CONTROLS
                  </h4>
                  <p className="text-xs text-[#6B6359] mt-0.5">
                    Authorized access to physical volumes catalog and order dispatch ledger.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#124C38]/10 text-[#124C38] border border-[#124C38]/30 rounded-[1px] font-bold">
                  AUTHORIZED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAdminConsole('inventory');
                  }}
                  className="p-4 bg-[#F8F7F4] hover:bg-white border border-[#E8E5DF] rounded-[2px] text-left transition-all cursor-pointer group"
                >
                  <div className="text-[10px] font-mono uppercase text-[#6B6359]">INVENTORY</div>
                  <div className="font-serif font-bold text-base text-[#16120F] mt-1 group-hover:text-[#7A1018]">
                    MANAGE VOLUMES
                  </div>
                  <div className="text-xs font-mono text-[#6B6359] mt-1">
                    {totalVolumesCount} Folios in Catalog
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAdminConsole('orders');
                  }}
                  className="p-4 bg-[#F8F7F4] hover:bg-white border border-[#E8E5DF] rounded-[2px] text-left transition-all cursor-pointer group"
                >
                  <div className="text-[10px] font-mono uppercase text-[#6B6359]">DISPATCH</div>
                  <div className="font-serif font-bold text-base text-[#16120F] mt-1 group-hover:text-[#7A1018]">
                    ORDERS ARCHIVE
                  </div>
                  <div className="text-xs font-mono text-[#6B6359] mt-1">
                    {totalOrdersCount} Customer Records
                  </div>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

function houseDataName(key: HogwartsHouse): string {
  const names: Record<HogwartsHouse, string> = {
    gryffindor: 'HOUSE OF GRYFFINDOR',
    slytherin: 'HOUSE OF SLYTHERIN',
    ravenclaw: 'HOUSE OF RAVENCLAW',
    hufflepuff: 'HOUSE OF HUFFLEPUFF',
  };
  return names[key] || 'HOGWARTS HOUSE';
}
